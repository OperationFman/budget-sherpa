using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseReset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CountryRate",
                columns: table => new
                {
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    Backpacker = table.Column<int>(type: "INTEGER", nullable: false),
                    Average = table.Column<int>(type: "INTEGER", nullable: false),
                    Luxury = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CountryRate", x => x.Country);
                });

            migrationBuilder.CreateTable(
                name: "Entry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    SelectedCountryRate = table.Column<int>(type: "INTEGER", nullable: false),
                    Days = table.Column<int>(type: "INTEGER", nullable: false),
                    Commute = table.Column<int>(type: "INTEGER", nullable: true),
                    CommuteCost = table.Column<int>(type: "INTEGER", nullable: true),
                    Extras = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entry", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CountryRate");

            migrationBuilder.DropTable(
                name: "Entry");
        }
    }
}
