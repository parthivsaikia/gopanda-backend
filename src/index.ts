import app from "./app";
import { PORT, DATABASE_URL } from "./config/environment.config";

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT, DATABASE_URL);
});
