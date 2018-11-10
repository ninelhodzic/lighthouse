/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

declare module 'lighthouse-logger' {
  interface Status {
    msg: string;
    id: string;
    args?: any[];
  }
  export function setLevel(level: string): void;
  export function formatProtocol(prefix: string, data: Object, level?: string): void;
  export function log(title: string, ...args: any[]): void;
  export function warn(title: string, ...args: any[]): void;
  export function error(title: string, ...args: any[]): void;
  export function verbose(title: string, ...args: any[]): void;
  export function isVerbose(): boolean;
  export function time(status: Status, level?: string): void;
  export function timeEnd(status: Status, level?: string): void;

  type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
  type IsFunction<T> = T extends Function ? T : never;
  interface TimeDecorateOpts<Class, T extends Function> {
    msg: string | ((this: Class, ...args: ArgumentTypes<T>) => string);
    id?: string | ((this: Class, ...args: ArgumentTypes<T>) => string);
    timeBeginLogLevel?: string;
    timeEndLogLevel?: string;
  }

  /**
   * Decorates a function, calling time/timeEnd before/after calling the original function.
   */
  export function timeDecorate<Fn extends Function>(fn: Fn, opts: TimeDecorateOpts<Fn['prototype'], Fn>): Fn;
  
  /**
   * Decorates (like timeDecorate) specified methods of a class.
   * If decorating instance methods, use the class's prototype.
   * If decorating static methods, use the class directly.
   */
  export function timeDecorateClass<Class, Prop extends keyof Class>(
    klass: Class,
    methods: {[key in Prop]: TimeDecorateOpts<Class, IsFunction<Class[key]>>},
  ): void;

  export function reset(): string;
  /** Retrieves and clears all stored time entries. */
  export function takeTimeEntries(): PerformanceEntry[];
  export function getTimeEntries(): PerformanceEntry[];
  export var events: import('events').EventEmitter;
}
