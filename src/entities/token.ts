import { Currency } from './currency'
import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent.
   * @param other other token to compare
   * @throws if the tokens share the address and chain ID but have different metadata
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    const equivalent = this.chainId === other.chainId && this.address === other.address
    if (equivalent) {
      // reference the same token, must have the same decimals/symbol/name
      invariant(this.decimals === other.decimals, 'DECIMALS')
      if (this.symbol && other.symbol) invariant(this.symbol === other.symbol, 'SYMBOL')
      if (this.name && other.name) invariant(this.name === other.name, 'NAME')
    }
    return equivalent
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.BSC]: new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
  [ChainId.CHAPEL]: new Token(ChainId.CHAPEL, '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e', 18, 'WBNB', 'Wrapped BNB'),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.EVMOSTEST]: new Token(
    ChainId.EVMOSTEST,
    '0x42CeDD53a09dCd6cd9482d9a6B75C8fdB2bA5132',
    18,
    'WTEVMOS',
    'Wrapped TEVMOS'
  ),
  [ChainId.EVMOS]: new Token(
    ChainId.EVMOS,
    '0xd4949664cd82660aae99bedc034a0dea8a0bd517',
    18,
    'WEVMOS',
    'Wrapped EVMOS'
  ),
  [ChainId.CELO]: new Token(ChainId.CELO, '0xe9eCec2cfA95D7df0644B6c8BaDD3BC1c3Cf39BA', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.CELOALFAJORES]: new Token(
    ChainId.CELOALFAJORES,
    '0xC8F2E555951a1eDb610b5bEBa530F4130E5d94F9',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ZKSYNCTEST]: new Token(
    ChainId.ZKSYNCTEST,
    '0xa1EA0B2354F5A344110af2b6AD68e75545009a03',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ZKSYNC]: new Token(
    ChainId.ZKSYNC,
    '0xa1EA0B2354F5A344110af2b6AD68e75545009a03',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SCROLLGOERLITEST]: new Token(
    ChainId.SCROLLGOERLITEST,
    '0xa1EA0B2354F5A344110af2b6AD68e75545009a03',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SCROLLSEPOLIATEST]: new Token(
    ChainId.SCROLLSEPOLIATEST,
    '0x5300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.SCROLL]: new Token(ChainId.SCROLL, '0x5300000000000000000000000000000000000004', 18, 'WETH', 'Wrapped Ether')
}

export const TOKENS = {
  [ChainId.SCROLL]: {
    Tokens: {
      ADDRESSES: {
        tokenA: '0x738BE769a3f9C2887d657D25C734b0d16FBf9459',
        tokenB: '0x7c69709b8AC34058990066D32c08637f667eb3De',
        WETH: '0x5300000000000000000000000000000000000004',
        USDC: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4',
        USDT: '0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df',
        axlUSDC: '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
        WBTC: '0x3C1BCa5a656e69edCD0D4E36BEbb3FcDAcA60Cf1',
        SpaceFi: '0xD8d530b676AFBe5eb74B2F345099726aDaBca848',
        DAI: '0xcA77eB3fEFe3725Dc33bccB54eDEFc3D9f764f97',
        PUNK: '0xDdEB23905F6987d5f786A93C00bBED3d97Af1ccc',
        SCRIPT: '0x87203Ff9393dC97D7847B4D4103bC32fea7d2DB2',
        wstETH: '0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32',
        KNC: '0x608ef9A3BffE206B86c3108218003b3cfBf99c84',
        roulette: '0x5Ff3dFAcabc9FA708490035000EcFeC100e5787A',
        FLW: '0x506e9a6822F9991209BdE789B27e5dC6c885EF99',
        Shegby: '0x12D27570A092E54082Ce3c3301714a0f4694AdbD',
        ROCK: '0xCE3CfE8781E6dD5EE185d63100236743469acfA1',
        SC: '0x0cB369D9568E650361d789C20485DFb2E2608Cc7',
        XLCL: '0x9D91C21b1c12Ebc8743CE8Ad5FfF4F958439E602',
        SOI: '0xe795F59D3556285454bd00Cabc35682dc8455Fc2',
        IZI: '0x9acE0E3bb92948647D91CaF5406c402f37A62686'
      },
      Pair: {
        tokenA_tokenB: '0x9BA1B29ff7fa2a0e4744C6098067E722D419c127',
        USDC_tokenB: '0x6873f1e2e47D1bDEEa36C4D71A31316E8DC7dD1b',
        USDC_WETH: '0x6905C59Be1a7Ea32d1F257E302401eC9a1401C52',
        USDC_USDT: '0x663864d52C38741001A73D270F4Da50005c647fA',
        WETH_USDT: '0x33c00e5E2Cf3F25E7c586a1aBdd8F636037A57a0',
        USDC_tokenA: '0x5Bf4461dc7074e51647BaD447668B6a7c4e82cF3',
        WETH_axlUSDC: '0x1AF6ed99A43a038573162BB75731FAD1102d6DDc',
        WBTC_WETH: '0xfA776F4e1ED05B0c9ABDa488Ab142541cF7c195c',
        WETH_SpaceFi: '0xf10a58Fd0eb6087e3b9d981AFA91c1740e818d62',
        WETH_DAI: '0x6b39911E2FeC73a995B1Db414E9E948d17b53c6d',
        USDC_axlUSDC: '0xF6317ce2d1De3D3dc9FceB9f02cAdD14FA9aF7c9',
        USDC_DAI: '0x31bD41030227196E10E63F5bAbE92A413568b1e8',
        WETH_PUNK: '0xC449d2dE0c08b67a4aF30367Bf233b9DCAc7626e',
        WETH_SCRIPT: '0x74d4946071e2ED0230eFF9319D9523D931B2fbAb',
        USDC_wstETH: '0x9F39E956c9F164d22BcD874b413461CE7862212F',
        USDC_WBTC: '0x90d9Ea36577aF993c39eF143177406616B8105c7',
        WBTC_USDT: '0xD0e620a856722217470bcd88b3DD0C7e3492C6f7',
        DAI_USDT: '0x18e6A6977A69A2a5d8152230437740257A9261F1',
        WETH_KNC: '0x9498CA6b30b978419F37f42b5a9b6A678BF8c3d2',
        WETH_roulette: '0xC737e24166f1921b5D04Ef94d4A580e124BeFD2a',
        FLW_WETH: '0x2FFE27063E175EaDdBa38a92E9d43721e2f40804',
        USDC_Shegby: '0xD16E3b7105262A6AEfBB4B4B199253B57e224dc4',
        WETH_ROCK: '0x877C91aC898aC71FD22C634C51e82985BCB77C64',
        SC_WETH: '0x19316BF03Ee2cEC9500144a0904Cc4ff6d41045b',
        WETH_XLCL: '0xE0a449D265BC2AacdFE1971C274D2cDd56aC8A97',
        SOI_USDT: '0x4404b964bbccFAe5ad2D4671dFDA7B7c25efBa1a',
        IZI_SOI: '0xa072a26cC92F02F07273108591316C3238b2D51C',
        WETH_wstETH: '0xBE7c742b944a6e38dD3A4C50100fa5fa1f451401'
      }
    }
  },
  [ChainId.SCROLLSEPOLIATEST]: {
    Tokens: {
      ADDRESSES: {
        WETH: '0x5300000000000000000000000000000000000004',
        SPACE: '0xeFBB3810C4347f416d2A24EE37b09b466b6Eac15',
        GHO: '0xD9692f1748aFEe00FACE2da35242417dd05a8615'
      },
      Pair: {
        WETH_GHO: '0xb2fCdC9763Bc44bF6DBF9F9C070E3eA3C01c67df',
        WETH_SPACE: '0xB473160C57C7b2D228Ba5A5f3c76EBC2E9668c65',
        GHO_SPACE: '0xA85AbCc53B1914d0bd0df4acA70e7E4139dd11fc'
      }
    }
  }
}
