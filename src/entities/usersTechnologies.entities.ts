import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entities";
import { Technology } from "./technologies.entities";

@Entity("users_technologies")
export class UserTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "date" })
  addedAt: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Technology)
  technology: Technology;
}
