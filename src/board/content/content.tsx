import { AboutContent } from "./about";
import { ExperienceContent } from "./experience";
import { ProjectsContent } from "./projects";
import { ContactsContent } from "./contacts";

export const CONTENT = {
  about: AboutContent,
  experience: ExperienceContent,
  projects: ProjectsContent,
  contacts: ContactsContent,
} as const;

export type NodeKey = keyof typeof CONTENT;
