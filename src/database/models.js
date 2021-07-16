import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class Message extends Model {
  static table = 'messages';

  @field('uuid') uuid;
  @field('content') content;
  @field('author_uuid') author_uuid;
  @field('author_name') author_name;
  @field('is_synchronized') is_synchronized;
  @field('timestamps') timestamps;
}
