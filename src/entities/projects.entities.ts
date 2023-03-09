import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users.entities";
import { UserProjectTeam } from "./usersProjectsTeam.entities";
import { ProjectTechnology } from "./projectsTechnologies.entities";

export enum devTypeProjectRole {
  FRONT = "Front-end",
  BACK = "Back-end",
  FULL = "Full-stack",
}

export enum statusProjectRole {
  OPEN = "Aberto",
  INPROCESS = "Em andamento",
  CLOSED = "Finalizado",
}

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: "50" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: statusProjectRole,
    default: statusProjectRole.OPEN,
  })
  status: statusProjectRole = statusProjectRole.OPEN;

  @Column({ type: "enum", enum: devTypeProjectRole })
  devType: devTypeProjectRole;

  @Column({ type: "varchar", length: "150", nullable: true })
  cover?: string | null | undefined;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @OneToMany(
    () => ProjectTechnology,
    (projectTechnology) => projectTechnology.technology
  )
  projectTechnologies: ProjectTechnology[];

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(
    () => UserProjectTeam,
    (userProjectTeam) => userProjectTeam.project
  )
  team: UserProjectTeam;
}
