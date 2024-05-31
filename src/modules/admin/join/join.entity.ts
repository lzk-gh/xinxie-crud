import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Join {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // 专业
  @Column()
  profession: string;

  // 意愿部门
  @Column()
  department: string;

  // 申请理由
  @Column()
  reason: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
