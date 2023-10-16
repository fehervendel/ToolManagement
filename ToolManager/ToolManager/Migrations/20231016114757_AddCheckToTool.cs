using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToolManager.Migrations
{
    public partial class AddCheckToTool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Check",
                table: "Tools",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Check",
                table: "Tools");
        }
    }
}
