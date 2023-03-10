import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./projects.entities";
import { User } from "./users.entities";

@Entity("users_projects_team")
export class UserProjectTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: true })
  waiting: boolean = false;

  @CreateDateColumn({ type: "date" })
  addedAt: string;

  @ManyToOne(() => Project)
  project: Project;

  @ManyToOne(() => User)
  user: User;
}
