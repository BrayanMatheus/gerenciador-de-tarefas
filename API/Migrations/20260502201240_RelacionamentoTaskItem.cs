using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class RelacionamentoTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "descricao",
                table: "TaskItem",
                newName: "Descricao");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "TaskItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "TaskItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_CategoriaId",
                table: "TaskItem",
                column: "CategoriaId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskItem_UsuarioId",
                table: "TaskItem",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItem_Categoria_CategoriaId",
                table: "TaskItem",
                column: "CategoriaId",
                principalTable: "Categoria",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItem_Usuario_UsuarioId",
                table: "TaskItem",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItem_Categoria_CategoriaId",
                table: "TaskItem");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskItem_Usuario_UsuarioId",
                table: "TaskItem");

            migrationBuilder.DropIndex(
                name: "IX_TaskItem_CategoriaId",
                table: "TaskItem");

            migrationBuilder.DropIndex(
                name: "IX_TaskItem_UsuarioId",
                table: "TaskItem");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "TaskItem");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "TaskItem");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "TaskItem",
                newName: "descricao");
        }
    }
}
