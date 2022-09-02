import { range } from "lodash";
import { Tile, Position, Grid } from "~/core/game";

export const MAX_GRID_SIZE = 6;

const SurroundingTilesTransforms: Position[] = [
  { y: -1, x: -1 },
  { y: -1, x: 0 },
  { y: -1, x: +1 },
  { y: 0, x: -1 },
  { y: 0, x: +1 },
  { y: +1, x: -1 },
  { y: +1, x: 0 },
  { y: +1, x: +1 },
];

export const updateGrid = (grid: Grid, tile: Tile) => {
  const createBlankTile = () =>
    ({
      position: { y: 0, x: 0 },
      status: "disabled",
      card: null,
    } as const);

  // Fill missing top row
  if (!grid[tile.position.y - 1]?.[tile.position.x]) {
    grid.unshift(range(grid[0]!.length).map(() => createBlankTile()));
  }

  // Fill missing bottom row
  if (!grid[tile.position.y + 1]?.[tile.position.x]) {
    grid.push(range(grid[0]!.length).map(() => createBlankTile()));
  }

  // Fill missing left column
  if (!grid[tile.position.y]?.[tile.position.x - 1]) {
    grid.forEach((row) => {
      row.unshift(createBlankTile());
    });
  }

  // Fill missing right column
  if (!grid[tile.position.y]?.[tile.position.x + 1]) {
    grid.forEach((row) => {
      row.push(createBlankTile());
    });
  }

  // Limit map width
  if (grid[0]!.length === MAX_GRID_SIZE + 2) {
    grid.forEach((row) => {
      row.at(0)!.status = "edge";
      row.at(-1)!.status = "edge";
    });
  }

  // Limit map height
  if (grid.length === MAX_GRID_SIZE + 2) {
    grid.at(0)!.forEach((tile) => {
      tile.status = "edge";
    });
    grid.at(-1)!.forEach((tile) => {
      tile.status = "edge";
    });
  }

  // Rewrite grid coordinates
  grid.forEach((row, rowIndex) => {
    row.forEach((tile, columnIndex) => {
      tile.position.y = rowIndex;
      tile.position.x = columnIndex;
    });
  });

  // Enable surrounding tiles
  SurroundingTilesTransforms.map((transform) => {
    const surroundingTile =
      grid[tile.position.y + transform.y]?.[tile.position.x + transform.x];

    if (surroundingTile && surroundingTile?.status !== "edge") {
      surroundingTile.status = "live";
    }
  });
};
