import { JsonController, Get, Post, Body, Param } from "routing-controllers";
import { IPerson } from "./Person.types";
import { ApiResponse } from "helpers/ApiResponse";
import { ApiError } from "helpers/ApiError";

const storageData: IPerson[] = [];

@JsonController("/person")
export default class Person {
  @Get()
  async getAll() {
    return storageData;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number): Promise<ApiResponse<IPerson | {}>> {
    const person = storageData.find((item) => item.id === id);

    if (!person) {
      throw new ApiError(404, {
        code: "PERSON_NOT_FOUND",
        message: `Person with id ${id} not found`,
      });
    }

    return new ApiResponse(true, person);
  }

  @Post()
  async setPerson(@Body() body: IPerson) {
    storageData.push(body);
    return new ApiResponse(true, "Person successfully created");
  }
}
