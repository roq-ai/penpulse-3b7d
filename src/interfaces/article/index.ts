import { TopicInterface } from 'interfaces/topic';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ArticleInterface {
  id?: string;
  title: string;
  content: string;
  status: string;
  topic_id: string;
  content_creator_id: string;
  created_at?: any;
  updated_at?: any;

  topic?: TopicInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ArticleGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  status?: string;
  topic_id?: string;
  content_creator_id?: string;
}
