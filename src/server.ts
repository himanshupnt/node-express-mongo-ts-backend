import app from "./app";

const port: string = process.env.PORT || "3000";

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening at http://localhost:${port}/`);
});
