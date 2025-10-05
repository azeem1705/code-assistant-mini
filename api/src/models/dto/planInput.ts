import { IsNotEmpty, IsString, IsIn } from "class-validator";

export class PlannerInput {
  @IsString()
  @IsNotEmpty()
  task!: string;

  @IsString()
  @IsIn(["planner", "normal"])
  mode!: "planner" | "normal";
}