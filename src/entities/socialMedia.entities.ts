import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("social_media")
export class SocialMedia {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: "50" })
  linkedln: string;

  @Column({ type: "varchar", length: "50" })
  github: string;

  @Column({ type: "varchar", length: "120" })
  youtube: string;

  @Column({ type: "varchar", length: "50" })
  instagram: string;

  @Column({ type: "varchar", length: "50" })
  discord: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;
}
