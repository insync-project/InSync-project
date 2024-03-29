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
    type: "varchar",
    default: "Aberto",
  })
  status: string = "Aberto";

  @Column({ type: "varchar" })
  devType: string;

  @Column({ type: "varchar", length: "150", nullable: true })
  cover?: string | null | undefined;

  @Column({ type: "int" })
  maxUsers: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(
    () => ProjectTechnology,
    (projectTechnology) => projectTechnology.project
  )
  projectTechnologies: ProjectTechnology[];

  @OneToMany(
    () => UserProjectTeam,
    (userProjectTeam) => userProjectTeam.project
  )
  team: UserProjectTeam[];
}
