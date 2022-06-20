export interface IToken {
  token: string;
}

export interface IDecodedToken {
  userId: string;
  exp: number;
}

export interface IValid {
  valid: boolean;
}

export interface ITokenData {
  userId: string;
}
