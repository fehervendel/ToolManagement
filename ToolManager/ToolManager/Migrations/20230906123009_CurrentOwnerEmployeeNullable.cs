using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToolManager.Migrations
{
    public partial class CurrentOwnerEmployeeNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrentOwnerEmployeeId",
                table: "Tools",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrentOwnerEmployeeId",
                table: "Tools",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
