import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("technologies")
export class Technology {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: "30" })
  name: string;
}
