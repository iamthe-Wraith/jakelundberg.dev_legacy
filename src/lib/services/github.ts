import { GITHUB_API_TOKEN } from '$env/static/private';
import { Octokit } from '@octokit/core';

/**
 * I already track all my learning in GitHub, so rather than convert it over
 * to a new system, I'm going to use the GitHub API to pull in the learning I
 * am already tracking.
 */

const octokit = new Octokit({ auth: GITHUB_API_TOKEN });

interface ILearningMedium {
  title: string;
  url: string;
  description: string;
  isSuggested: boolean;
}

interface IArticle extends ILearningMedium {}

interface IBook extends ILearningMedium {
  author: string;
  cover?: string;
}

interface ICourse extends ILearningMedium {}

interface IVideo extends ILearningMedium {}

interface IGHLabel {
  name: string;
}

interface IBaseGHIssue {
  title: string;
  labels: IGHLabel[];
  state: string;
}

interface IGHIssue extends IBaseGHIssue {
  body: string;
}

interface IGHArticleIssue extends IBaseGHIssue {
  body: IArticle;
}

interface IGHBookIssue extends IBaseGHIssue {
  body: IBook;
}

interface IGHCourseIssue extends IBaseGHIssue {
  body: ICourse;
}

const determineIfIsSuggested = (issue: IGHIssue) => {
  return issue.labels.filter((label) => (label as IGHLabel).name === 'suggested-reading').length > 0;
}

const getArticles = (learnings: IGHIssue[]): IArticle[] => {
  const articles = learnings.filter((issue) => {
    return issue.labels.filter((label) => (label as IGHLabel).name === 'edu:article').length;
  })
    .map((issue) => {
      const { url, description } = (issue as unknown as IGHArticleIssue).body;

      if (!url || !description) {
        console.log(`>>>>> invalid article body found for ${issue.title}. Missing url or description`);
        return null;
      } else {
        return {
          ...(issue as unknown as IGHArticleIssue).body,
          isSuggested: determineIfIsSuggested(issue),
          title: issue.title,
        }
      }
    })
    .filter((article) => article !== null);

  return articles as IArticle[];
}

const getBooks = (learnings: IGHIssue[]): IBook[] => {
  const books = learnings.filter((issue) => {
    return issue.labels.filter((label) => (label as IGHLabel).name === 'edu:book').length;
  })
    .map((issue) => {
      const { author, url, description } = (issue as unknown as IGHBookIssue).body;

      if (!author || !url || !description) {
        console.log(`>>>>> invalid book body found for ${issue.title}. Missing author, url or description`);
        return null;
      } else {
        return {
          ...(issue as unknown as IGHBookIssue).body,
          isSuggested: determineIfIsSuggested(issue),
          title: issue.title,
        }
      }
    })
    .filter((article) => article !== null);

  return books as IBook[];
}

const getCourses = (learnings: IGHIssue[]): ICourse[] => {
  const courses = learnings.filter((issue) => {
    return issue.labels.filter((label) => (label as IGHLabel).name === 'edu:course').length;
  })
    .map((issue) => {
      const { url, description } = (issue as unknown as IGHCourseIssue).body;

      if (!url || !description) {
        console.log(`>>>>> invalid course body found for ${issue.title}. Missing url or description`);
        return null;
      } else {
        return {
          ...(issue as unknown as IGHCourseIssue).body,
          isSuggested: determineIfIsSuggested(issue),
          title: issue.title,
        }
      }
    })
    .filter((article) => article !== null);

  return courses as ICourse[];
}

const getVideos = (learnings: IGHIssue[]): IVideo[] => {
  const videos = learnings.filter((issue) => {
    return issue.labels.filter((label) => (label as IGHLabel).name === 'edu:video').length;
  })
    .map((issue) => {
      const { url, description } = (issue as unknown as IGHCourseIssue).body;

      if (!url || !description) {
        console.log(`>>>>> invalid course body found for ${issue.title}. Missing url or description`);
        return null;
      } else {
        return {
          ...(issue as unknown as IGHCourseIssue).body,
          isSuggested: determineIfIsSuggested(issue),
          title: issue.title,
        }
      }
    })
    .filter((article) => article !== null);

  return videos as IVideo[];
}

const parseBody = (issue: IGHIssue): IArticle | IBook | ICourse | null => {
  let parsed = null;
  let sterilized = '';

  try {
    if (issue.body) {
      sterilized = issue.body.replaceAll('```', '').trim();
      parsed = JSON.parse(sterilized) as IArticle | IBook | ICourse;
    } else {
      throw new Error('No body found');
    }
  } catch (err: any) {
    console.log('>>>>> error parsing issue body', issue.title);
    console.log('>>>>> ', err.message);
  }

  return parsed;
}

const getAllLearnings = async (): Promise<IGHIssue[]> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/issues{?state}', {
    state: 'closed',
    owner: 'iamthe-Wraith',
    repo: 'the-shop',
  });

  // pull all issues with suggested-reading label
  return response.data.filter((issue: IGHIssue) => {
    let isLearning = false;
    let isExcluded = false;

    for (const label of issue.labels) {
      if ((label as IGHLabel).name === 'edu:article' ||
      (label as IGHLabel).name === 'edu:book' ||
      (label as IGHLabel).name ===  'edu:course' ||
      (label as IGHLabel).name ===  'edu:video') {
        isLearning = true;
      }

      if ((label as IGHLabel).name === 'exclude') {
        isExcluded = true;
      }
    }

    return isLearning && !isExcluded;
  })
    .map((issue: IGHIssue) => {
      const body = parseBody(issue);
      return { ...issue, body };
    })
    .filter((issue: IGHIssue) => issue.body);
}

export const getLearning = async () => {
  const learnings = await getAllLearnings();
  // TODO: refactor this to only iterate over suggested once
  const articles = getArticles(learnings);
  const books = getBooks(learnings);
  const courses = getCourses(learnings);
  const videos = getVideos(learnings);
  return { articles, books, courses, videos };
};
