import {
    exec
} from "child_process";
import {
    promisify
} from "util";

const execAsync = promisify(exec);

export const executeSystemCommand = async (command) => {
    try {
        const {
            stdout,
            stderr
        } = await execAsync(command);
        return stdout || stderr;
    } catch (error) {
        throw new Error(`Command failed: ${error.message}`);
    }
};

export const openApplication = (appName) => {
    const platform = process.platform;
    let command;

    if (platform === "win32") {
        command = `start ${appName}`;
    } else if (platform === "darwin") {
        command = `open -a "${appName}"`;
    } else {
        command = `xdg-open ${appName}`;
    }

    return executeSystemCommand(command);
};