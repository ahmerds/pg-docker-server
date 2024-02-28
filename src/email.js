export function getEmail(type) {
  return `
  <head>
    <title>Backup Notification Mail</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f9faf9;
      font-family: Avenir, Helvetica, Arial, sans-serif;
    "
  >
    <center
      style="
        width: 100%;
        table-layout: fixed;
        background-color: #f9faf9;
        padding: 56px 0 20px;
      "
    >
      <div style=" max-width: 555px;">
        <table
          style="
            border-spacing: 0;
            margin: 0 auto;
            width: 100%;
            max-width: 555px;
            border-spacing: 0;
            font-family: Avenir, Helvetica, Arial, sans-serif;
            color: #333333;
          "
          align="center"
        >
          <!-- logo area -->
          <tbody>
            <tr>
              <td style="
                padding: 0;
                background: #EEEEEE;
              ">
                <table style="border-spacing: 0; width: 100%; border-spacing: 0">
                  <tbody>
                    <tr>
                      <td style="padding: 0; padding: 40px 0 24px 32px;">
                        <h3>
                          Postgres Backup Notification
                        </h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <!-- content area -->
            <tr>
              <td style="padding: 0">
                <table style="border-spacing: 0; width: 100%; border-spacing: 0">
                  <tbody>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          background-color: #ffffff;
                          padding: 32px;
                        "
                      >
                        <h1
                          style="
                            font-size: 26px;
                            color: #202224;
                            font-family: 'DM Sans', Avenir, Helvetica, Arial, sans-serif;
                          "
                        >
                          ${ type === "success" ? "Database Backup Successful 🎉" : 'Database Backup Failed 😓' }
                        </h1>
                        <p
                          style="
                            font-size: 16px;
                            line-height: 24px;
                            font-weight: 400;
                            margin-bottom: 16px;
                            font-family: Avenir, Helvetica, Arial, sans-serif;
                          "
                        >
                          Beep Bop,<br /> 
                          <br />
                          ${ type === "success"
                            ? "Your PostgreSQL database was backed up successfully and the backup file was uploaded to your S3 server on " + new Date().toString()
                            : "Your PostgreSQL database backup failed. Login to your server and check your error logs."
                          }
                        </p>
                        <br />
                        <span
                          style="
                            font-size: 10px;
                            color: #666666;
                            line-height: 13px;
                          "
                          >This email was sent from your database server. Created by ASH!</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </center>
  </body>
  `
}
