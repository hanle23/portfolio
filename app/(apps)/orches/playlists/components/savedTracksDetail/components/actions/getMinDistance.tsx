export default function getMinDistance(
  characteristicArray: number[][],
  target: number,
): number {
  let result = -1
  for (
    let arrayIndex = 0;
    arrayIndex < characteristicArray.length;
    arrayIndex++
  ) {
    const currItem = characteristicArray[arrayIndex]
    if (currItem[0] <= target && target <= currItem[1]) {
      return 0
    }
    const diffLowerRange = Math.abs(currItem[0] - target)
    const diffUpperRange = Math.abs(currItem[1] - target)
    const currMin = Math.min(diffLowerRange, diffUpperRange)
    if (result === -1) {
      result = currMin
    } else if (currMin > result) {
      break
    } else {
      result = Math.min(result, currMin)
    }
  }
  return result
}
