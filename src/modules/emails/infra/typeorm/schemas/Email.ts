/* eslint-disable camelcase */
import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Email {
  @ObjectIdColumn()
  id: string;

  @Column()
  subject: string;

  @Column()
  message_text: string;

  @Column()
  message_html: string;

  @Column()
  email_from: string;

  @Column()
  email_to: string;

  @Column()
  email_send: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Email;
