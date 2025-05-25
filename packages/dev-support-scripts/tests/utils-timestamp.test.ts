import * as utils from "../utils"

/**
 * Tests for timestamp and command string generation functions
 * These tests validate the timestamp formatting and header generation
 */
describe("getTimestampStr", () => {
	test("returns correctly formatted timestamp", () => {
		const timestamp = utils.getTimestampStr()

		// Check format: YYYY-MM-DD HH:MM:SS
		expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)

		// Verify it's a valid date close to now
		const parsedDate = new Date(timestamp)
		const now = new Date()
		const timeDiff = Math.abs(now.getTime() - parsedDate.getTime())

		// Should be within 5 seconds of current time
		expect(timeDiff).toBeLessThan(5000)
	})
})

describe("getCommandStr", () => {
	test("returns process arguments joined as string", () => {
		const originalArgv = process.argv

		try {
			// Mock process.argv
			process.argv = ["node", "script.js", "--test", "value"]

			const commandStr = utils.getCommandStr()
			expect(commandStr).toBe("node script.js --test value")
		} finally {
			// Restore original argv
			process.argv = originalArgv
		}
	})
})

describe("addFileHeader", () => {
	test("formats header correctly with timestamp and command", () => {
		const content = "Test content"
		const command = "test command"

		const result = utils.addFileHeader(content, command)

		// Check header format
		expect(result).toContain("Generated on:")
		expect(result).toContain("Command: test command")
		expect(result).toContain(content)

		// Header should come before content
		const headerEndPos = result.indexOf(content)
		const timestampPos = result.indexOf("Generated on:")
		const commandPos = result.indexOf("Command:")

		expect(timestampPos).toBeLessThan(commandPos)
		expect(commandPos).toBeLessThan(headerEndPos)
	})

	test("uses getCommandStr when command parameter is omitted", () => {
		const originalArgv = process.argv

		try {
			// Mock process.argv
			process.argv = ["node", "script.js", "--test", "value"]

			const content = "Test content"
			const result = utils.addFileHeader(content) // No command provided

			expect(result).toContain("Command: node script.js --test value")
			expect(result).toContain(content)
		} finally {
			// Restore original argv
			process.argv = originalArgv
		}
	})
})
