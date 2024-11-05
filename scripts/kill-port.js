import { exec } from 'child_process';

const killPort = (port) => {
  const platform = process.platform;
  const command = platform === 'win32'
    ? `netstat -ano | findstr :${port}`
    : `lsof -i :${port}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`No process running on port ${port}`);
      return;
    }

    if (platform === 'win32') {
      const lines = stdout.split('\n');
      lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid) {
          exec(`taskkill /F /PID ${pid}`);
        }
      });
    } else {
      const pid = stdout.split('\n')[1]?.split(/\s+/)[1];
      if (pid) {
        exec(`kill -9 ${pid}`);
      }
    }
  });
};

killPort(5000);