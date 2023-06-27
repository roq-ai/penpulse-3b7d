import { ArticleInterface } from 'interfaces/article';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface TopicInterface {
  id?: string;
  name: string;
  publisher_id: string;
  created_at?: any;
  updated_at?: any;
  article?: ArticleInterface[];
  publisher?: PublisherInterface;
  _count?: {
    article?: number;
  };
}

export interface TopicGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  publisher_id?: string;
}
