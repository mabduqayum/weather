import { TempPipe } from './temp.pipe';

describe('TempPipe', () => {
  // Step 1: Initialize Pipe Instance
  let pipe: TempPipe;

  beforeEach(() => {
    pipe = new TempPipe();
  });

  // Step 2: Test 'transform' method
  it('should transform 30.6 to "30°"', () => {
    expect(pipe.transform(30.6)).toBe('30°');
  });

  it('should transform 25.9 to "25°"', () => {
    expect(pipe.transform(25.9)).toBe('25°');
  });

  it('should transform 0 to "0°"', () => {
    expect(pipe.transform(0)).toBe('0°');
  });

  it('should transform negative numbers like -5.4 to "-5°"', () => {
    expect(pipe.transform(-5.4)).toBe('-5°');
  });

  // Step 3: Test edge cases (Optional)
  it('should return "NaN°" for non-numeric values', () => {
    // @ts-ignore: Ignored to test incorrect usage
    expect(pipe.transform('not a number')).toBe('NaN°');
  });
});
