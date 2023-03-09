import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SocialMedia } from "./socialMedia.entities";
import { Project } from "./projects.entities";
import { UserTechnology } from "./usersTechnologies.entities";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: "50" })
  name: string;

  @Column({ type: "varchar", length: "50", unique: true })
  email: string;

  @Column({ type: "varchar", length: "30", unique: true })
  nickname: string;

  @Column({ type: "varchar", length: "120" })
  password: string;

  @Column({ type: "boolean", default: false })
  admin?: boolean = false;

  @Column({ type: "text", nullable: true })
  description?: string | null | undefined;

  @Column({ type: "varchar", length: "150", nullable: true })
  avatar?: string | null | undefined;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @OneToOne(() => SocialMedia)
  @JoinColumn()
  socialMedia?: SocialMedia | null | undefined;

  @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.user)
  userTechnologies: UserTechnology[];

  @OneToMany(() => Project, (project) => project.owner)
  project: Project[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassoword() {
    const test = getRounds(this.password);
    if (!test) {
      this.password = hashSync(this.password, 10);
    }
  }
}
