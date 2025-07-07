export const getSiteUrl = () => {
  if (
    $app.stage &&
    ["production", "preview"].includes($app.stage) &&
    process.env.DOMAIN
  )
    return $util.interpolate`${`https://${process.env.DOMAIN}`}`;

  return $util.interpolate`${`http://${
    process.env.DOMAIN ?? "localhost:5173"
  }`}`;
};
