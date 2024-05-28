import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tools {
  @PrimaryGeneratedColumn()
  id: number;

  // 类型
  @Column()
  type: number;

  // 标题
  @Column()
  title: string;

  // 概述
  @Column()
  summarize: string;

  // 链接
  @Column()
  link: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
