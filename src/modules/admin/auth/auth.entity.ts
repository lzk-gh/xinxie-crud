import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @Entity() 装饰器将该类标记为 TypeORM 实体，表示它对应数据库中的一个表。
 * @PrimaryGeneratedColumn() 装饰器将 id 属性标记为主键，并且设置为自增。
 * @Column() 装饰器将其他属性映射到数据库表的列。
 * unique: true 选项表示 email 列的值必须唯一。
 * nullable: true 选项表示该列的值可以为空
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

// 写完实体去module中引入
