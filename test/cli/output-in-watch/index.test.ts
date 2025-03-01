import { createCliTest } from '../utils'

describe('cli', () => {
  it(`cli output-in-watch should work properly`, async () => {
    await createCliTest(
      {
        directory: __dirname,
        args: ['hello.js', '-w', '-o', 'dist/hello.bundle.js'],
        abortTimeout: 3000,
      },
      ({ code, stdout }) => {
        const watchOutputRegex = /Build in \d+(.\d{2})ms/
        expect(stdout.includes('Watching project')).toBe(true)
        expect(watchOutputRegex.test(stdout)).toBe(true)
        expect(stdout.includes('Exports')).toBe(false)
        expect(code).toBe(143) // SIGTERM exit code
      },
    )
  })
})
