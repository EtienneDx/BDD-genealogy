import { Node, Integer, Relationship } from 'neo4j-driver'

export interface UserProperties {
  id: number;
  name?: string;
  email?: string;
  password?: string;
};

export type User = Node<Integer, UserProperties>;

export type Represents = Relationship<Integer, Record<string, never>>;