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

  @Column({ type: "varchar", length: "50", nullable: true })
  linkedln?: string | null | undefined;

  @Column({ type: "varchar", length: "50", nullable: true })
  github?: string | null | undefined;

  @Column({ type: "varchar", length: "120", nullable: true })
  youtube?: string | null | undefined;

  @Column({ type: "varchar", length: "50", nullable: true })
  instagram?: string | null | undefined;

  @Column({ type: "varchar", length: "50", nullable: true })
  discord?: string | null | undefined;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;
}
