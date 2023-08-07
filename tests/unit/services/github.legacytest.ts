import { GitHub } from '$lib/constants/github';
import { getArticles, getBooks, getCourses, getVideos, isSuggested, type IGHArticleIssue, type IGHBookIssue, type IGHCourseIssue, type IGHIssue, type IGHVideoIssue, parseIssueBody } from '$lib/services/github';
import { describe, it, expect } from 'vitest';

describe('GitHub Service', () => {
  describe('getArticles', () => {
    it('should return an array of article specific issues', () => {
      const issues = [
        {
          body: {
            url: 'https://www.example.com',
            description: 'this is just a test'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
      ] as unknown as IGHIssue[];

      const res = getArticles(issues);
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual({
        ...(issues[0] as unknown as IGHArticleIssue).body,
        title: issues[0].title,
        isSuggested: false,
      });
      expect(res[1]).toEqual({
        ...(issues[1] as unknown as IGHArticleIssue).body,
        title: issues[1].title,
        isSuggested: false,
      });
    });

    it('should return an empty array if an empty array is received', () => {
      const res = getArticles([]);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when no issues containing the ${GitHub.Labels.Article} label are found`, () => {
      const issues = [
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
      ] as IGHIssue[];

      const res = getArticles(issues);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when issues are found containing the ${GitHub.Labels.Article} label, but none contain valid bodies`, () => {
      const issues = [
        {
          body: 'invalid',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: '{ invalid: "invalid field" }',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: { invalid: 'invalid field' },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as IGHIssue[];

      const res = getArticles(issues);
      expect(res).toEqual([]);
    });
  });

  describe('getBooks', () => {
    it('should return an array of book specific issues', () => {
      const issues = [
        {
          body: {
            author: 'Dean Koontz',
            url: 'https://www.example.com',
            description: 'this is just a test'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: {
            author: 'Stephen King',
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: {
            author: 'J. R. R. Tolkien',
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: {
            author: 'J. K. Rowling',
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
      ] as unknown as IGHIssue[];

      const res = getBooks(issues);
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual({
        ...(issues[0] as unknown as IGHBookIssue).body,
        title: issues[0].title,
        isSuggested: false,
      });
      expect(res[1]).toEqual({
        ...(issues[1] as unknown as IGHBookIssue).body,
        title: issues[1].title,
        isSuggested: false,
      });
    });

    it('should return an empty array if an empty array is received', () => {
      const res = getBooks([]);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when no issues containing the ${GitHub.Labels.Book} label are found`, () => {
      const issues = [
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
      ] as IGHIssue[];

      const res = getBooks(issues);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when issues are found containing the ${GitHub.Labels.Book} label, but none contain valid bodies`, () => {
      const issues = [
        {
          body: 'invalid',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: '{ invalid: "invalid field" }',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: { invalid: 'invalid field' },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
      ] as IGHIssue[];

      const res = getBooks(issues);
      expect(res).toEqual([]);
    });
  });

  describe('getCourses', () => {
    it('should return an array of course specific issues', () => {
      const issues = [
        {
          body: {
            url: 'https://www.example.com',
            description: 'this is just a test'
          },
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as unknown as IGHIssue[];

      const res = getCourses(issues);
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual({
        ...(issues[0] as unknown as IGHCourseIssue).body,
        title: issues[0].title,
        isSuggested: false,
      });
      expect(res[1]).toEqual({
        ...(issues[1] as unknown as IGHCourseIssue).body,
        title: issues[1].title,
        isSuggested: false,
      });
    });

    it('should return an empty array if an empty array is received', () => {
      const res = getCourses([]);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when no issues containing the ${GitHub.Labels.Course} label are found`, () => {
      const issues = [
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as IGHIssue[];

      const res = getCourses(issues);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when issues are found containing the ${GitHub.Labels.Course} label, but none contain valid bodies`, () => {
      const issues = [
        {
          body: 'invalid',
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
        {
          body: '{ invalid: "invalid field" }',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: { invalid: 'invalid field' },
          labels: [
            {
              name: GitHub.Labels.Course
            }
          ]
        },
      ] as IGHIssue[];

      const res = getCourses(issues);
      expect(res).toEqual([]);
    });
  });

  describe('getVideos', () => {
    it('should return an array of video specific issues', () => {
      const issues = [
        {
          body: {
            url: 'https://www.example.com',
            description: 'this is just a test'
          },
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as unknown as IGHIssue[];

      const res = getVideos(issues);
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual({
        ...(issues[0] as unknown as IGHVideoIssue).body,
        title: issues[0].title,
        isSuggested: false,
      });
      expect(res[1]).toEqual({
        ...(issues[1] as unknown as IGHVideoIssue).body,
        title: issues[1].title,
        isSuggested: false,
      });
    });

    it('should return an empty array if an empty array is received', () => {
      const res = getVideos([]);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when no issues containing the ${GitHub.Labels.Article} label are found`, () => {
      const issues = [
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Book,
            }
          ]
        },
        {
          body: 'test',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as IGHIssue[];

      const res = getVideos(issues);
      expect(res).toEqual([]);
    });

    it(`should return an empty array when issues are found containing the ${GitHub.Labels.Video} label, but none contain valid bodies`, () => {
      const issues = [
        {
          body: 'invalid',
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
        {
          body: '{ invalid: "invalid field" }',
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
        {
          body: { invalid: 'invalid field' },
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
      ] as IGHIssue[];

      const res = getVideos(issues);
      expect(res).toEqual([]);
    });
  });

  describe('isSuggested', () => {
    it(`should return an array of issues that are suggested if they contain the ${GitHub.Labels.Suggested} label`, () => {
      const issues = [
        {
          body: {
            url: 'https://www.example.com',
            description: 'this is just a test'
          },
          labels: [
            {
              name: GitHub.Labels.Video
            },
            {
              name: GitHub.Labels.Suggested
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Video
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Book
            },
            {
              name: GitHub.Labels.Suggested
            }
          ]
        },
        {
          body: {
            url: 'https://www.another-example.com',
            description: 'this is just a test with another description'
          },
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
      ] as unknown as IGHIssue[];

      const suggestedIssues = issues.filter(issue => isSuggested(issue));
      expect(suggestedIssues.length).toEqual(2);
    });
  });

  describe('parseIssueBody', () => {
    it('should parse an issue\'s body into JSON', () => {
      const issues = [
        {
          body: '```{"url": "https://www.example.com", "description": "this is just a test"}```',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: '{"url": "https://www.another-example.com", "description": "this is just another test"}',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
      ] as IGHIssue[];

      const parsedBodies = issues.map(issue => parseIssueBody(issue));

      console.log('>>>>> parsedBodies', parsedBodies.length);

      expect(parsedBodies).toHaveLength(2);
      expect(parsedBodies[0]!.hasOwnProperty('url')).toBeTruthy();
      expect(parsedBodies[0]!.hasOwnProperty('description')).toBeTruthy();
      expect(parsedBodies[1]!.hasOwnProperty('url')).toBeTruthy();
      expect(parsedBodies[1]!.hasOwnProperty('description')).toBeTruthy();
    });

    it('should return null if parsing an issue body fails', () => {
      const issues = [
        {
          body: 'invalid',
          labels: [
            {
              name: GitHub.Labels.Article
            }
          ]
        },
        {
          body: 'also invalid',
          labels: [
            {
              name: GitHub.Labels.Book
            }
          ]
        },
      ] as IGHIssue[];

      const parsedBodies = issues.map(issue => parseIssueBody(issue));
      expect(parsedBodies).toHaveLength(2);
      expect(parsedBodies[0]).toBeNull();
      expect(parsedBodies[1]).toBeNull();
    });
  });
});
