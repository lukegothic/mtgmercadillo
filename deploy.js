const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

if ("MERCADILLOMAGIC_FTP_USER" in process.env && "MERCADILLOMAGIC_FTP_PASS" in process.env && "MERCADILLOMAGIC_FTP_URL" in process.env) {
    const config = {
        user: process.env.MERCADILLOMAGIC_FTP_USER,
        password: process.env.MERCADILLOMAGIC_FTP_PASS,
        host: process.env.MERCADILLOMAGIC_FTP_URL,
        port: 22,
        localRoot: __dirname + "/build",
        remoteRoot: "/",
        // include: ["*", "**/*"],      // this would upload everything except dot files
        include: ["*", "**/*"],
        // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
        exclude: ["data/*"],
        // delete ALL existing files at destination before uploading, if true
        deleteRemote: false,
        // Passive mode is forced (EPSV command is not sent)
        forcePasv: true,
        // use sftp or ftp
        sftp: true
    };

    ftpDeploy
        .deploy(config)
        .then((res) => console.log("finished:", res))
        .catch((err) => console.log(err));
} else {
    console.log("FTP_USER, FTP_PASS, FTP_URL not set");
}