import { freePoll } from '../src/index';

describe('Free Poll', () => {
  test('can poll 3 more times', async () => {
    const mockFetcher = jest.fn();
    mockFetcher.mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValue(true);
    const res = await freePoll({
      fetcher: mockFetcher,
      success: r => r === true,
    });
    expect(res).toBe(true);
    expect(mockFetcher).toBeCalledTimes(4);
  });

  test('can throw error when fetcher rejected', async () => {
    const mockFetcher = jest.fn();
    mockFetcher.mockResolvedValue(false).mockImplementation(() => { throw new Error('failed')});
    await expect(freePoll({
      fetcher: mockFetcher,
      success: r => r === true,
    })).rejects.toThrowError();
    expect(mockFetcher).toBeCalledTimes(1);
  })
})