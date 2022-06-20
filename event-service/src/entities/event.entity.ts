import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { EventType } from "../globals/enums";

@Entity({ name: "events" })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "enum",
    enum: EventType,
    default: EventType.Email,
  })
  type: EventType;

  @Column({ default: false })
  enabled: boolean;

  @Index()
  @Column({ nullable: false })
  userId: string;
}
