import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Candle = {
  __typename?: 'Candle';
  close: Scalars['String']['output'];
  high: Scalars['String']['output'];
  low: Scalars['String']['output'];
  open: Scalars['String']['output'];
  time: Scalars['String']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  logIn: SuccessMessage;
  logOut?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateUserArgs = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type PercentageChangeValue = {
  __typename?: 'PercentageChangeValue';
  percentageChange: Scalars['Float']['output'];
  time: Scalars['String']['output'];
};

export type PercentageChanges = {
  __typename?: 'PercentageChanges';
  symbol: Scalars['String']['output'];
  values: Array<PercentageChangeValue>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getAllIndexData?: Maybe<Array<Maybe<PercentageChanges>>>;
  getCandles?: Maybe<Array<Maybe<Candle>>>;
};


export type QueryCurrentUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllIndexDataArgs = {
  from: Scalars['String']['input'];
  resolution: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type QueryGetCandlesArgs = {
  from: Scalars['String']['input'];
  resolution: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Candle: ResolverTypeWrapper<Candle>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PercentageChangeValue: ResolverTypeWrapper<PercentageChangeValue>;
  PercentageChanges: ResolverTypeWrapper<PercentageChanges>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SuccessMessage: ResolverTypeWrapper<SuccessMessage>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Candle: Candle;
  Float: Scalars['Float']['output'];
  Mutation: {};
  PercentageChangeValue: PercentageChangeValue;
  PercentageChanges: PercentageChanges;
  Query: {};
  String: Scalars['String']['output'];
  SuccessMessage: SuccessMessage;
  User: User;
}>;

export type CandleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Candle'] = ResolversParentTypes['Candle']> = ResolversObject<{
  close?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  high?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  low?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'displayName' | 'email' | 'password'>>;
  logIn?: Resolver<ResolversTypes['SuccessMessage'], ParentType, ContextType, RequireFields<MutationLogInArgs, 'email' | 'password'>>;
  logOut?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type PercentageChangeValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['PercentageChangeValue'] = ResolversParentTypes['PercentageChangeValue']> = ResolversObject<{
  percentageChange?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PercentageChangesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PercentageChanges'] = ResolversParentTypes['PercentageChanges']> = ResolversObject<{
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['PercentageChangeValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryCurrentUserArgs>>;
  getAllIndexData?: Resolver<Maybe<Array<Maybe<ResolversTypes['PercentageChanges']>>>, ParentType, ContextType, RequireFields<QueryGetAllIndexDataArgs, 'from' | 'resolution' | 'to'>>;
  getCandles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Candle']>>>, ParentType, ContextType, RequireFields<QueryGetCandlesArgs, 'from' | 'resolution' | 'symbol' | 'to'>>;
}>;

export type SuccessMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessMessage'] = ResolversParentTypes['SuccessMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Candle?: CandleResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PercentageChangeValue?: PercentageChangeValueResolvers<ContextType>;
  PercentageChanges?: PercentageChangesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SuccessMessage?: SuccessMessageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

