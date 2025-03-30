/**
 * 缩短以太坊地址显示，便于用户界面展示
 * @param address 完整的以太坊地址
 * @returns 缩短后的地址，例如 0xabc...123
 */
export const shortenAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
}
