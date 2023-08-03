export interface IProject {
  id: string;
  title: string;
  urls: IProjectUrls;
  desc: string;
  tags: string[];
}

export interface IProjectUrls {
  url?: string; // used for all urls that to do match other properties of this interface
  github?: string; // only used for github urls
}