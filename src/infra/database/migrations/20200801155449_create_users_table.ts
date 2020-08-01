import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("users")

  console.log("aaaaaa tableExists", tableExists)
  if (tableExists) {
    return
  }

  await knex.schema.createTable("users", table => {
    table.uuid("id").notNullable()

    table.string("cpf").index().unique().notNullable()

    table.string("username").unique().notNullable()

    table.string("email").index().unique().notNullable()

    table.string("country").notNullable()

    table.string("gender").notNullable()

    table.timestamps()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users")
}
