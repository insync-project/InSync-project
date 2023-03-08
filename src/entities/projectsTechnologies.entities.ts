import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Technology } from "./technologies.entities";
import { Project } from "./projects.entities";

@Entity("projects_technologies")
export class ProjectTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  createdAt: string;

  @ManyToOne(() => Project)
  user: Project;

  @ManyToOne(() => Technology)
  technology: Technology;
}
