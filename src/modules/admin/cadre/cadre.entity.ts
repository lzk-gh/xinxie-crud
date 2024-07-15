import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cadre {
  @PrimaryGeneratedColumn()
  id: number;

  // 姓名
  @Column()
  name: string;

  // 头像
  @Column()
  avatar: string;

  // 职位
  @Column()
  position: string;

  // 座右铭
  @Column()
  motto: string;

  // 哪届干部
  @Column({ name: 'class_of' })
  classOf: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
