/**
 * @license
 * Copyright 2017 The Bazel Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The proxy design pattern, allowing us to customize behavior of the delegate
     * object.
     * This creates a property-by-property copy of the object, so it can be mutated
     * without affecting other users of the original object.
     * See https://en.wikipedia.org/wiki/Proxy_pattern
     */
    function createProxy(delegate) {
        var e_1, _a;
        var proxy = Object.create(null);
        var _loop_1 = function (k) {
            proxy[k] = function () {
                return delegate[k].apply(delegate, arguments);
            };
        };
        try {
            for (var _b = __values(Object.keys(delegate)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                _loop_1(k);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return proxy;
    }
    exports.createProxy = createProxy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVybmFsL3RzY193cmFwcGVkL3BsdWdpbl9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUVIOzs7Ozs7T0FNRztJQUNILFNBQWdCLFdBQVcsQ0FBSSxRQUFXOztRQUN4QyxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUN2QixDQUFDO1lBQ1YsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHO2dCQUNULE9BQVEsUUFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQztRQUNKLENBQUM7O1lBSkQsS0FBZ0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxnQkFBQTtnQkFBaEMsSUFBTSxDQUFDLFdBQUE7d0JBQUQsQ0FBQzthQUlYOzs7Ozs7Ozs7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFSRCxrQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFRoZSBCYXplbCBBdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKiAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIFByb3ZpZGVzIEFQSXMgZm9yIGV4dGVuZGluZyBUeXBlU2NyaXB0LlxuICogQmFzZWQgb24gdGhlIExhbmd1YWdlU2VydmljZSBwbHVnaW4gQVBJIGluIFRTIDIuM1xuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBsdWdpbkNvbXBpbGVySG9zdCBleHRlbmRzIHRzLkNvbXBpbGVySG9zdCB7XG4gIC8qKlxuICAgKiBBYnNvbHV0ZSBmaWxlIHBhdGhzIHdoaWNoIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgaW5pdGlhbCB0cy5Qcm9ncmFtLlxuICAgKiBJbiB2YW5pbGxhIHRzYywgdGhlc2UgYXJlIHRoZSB0cy5QYXJzZWRDb21tYW5kTGluZSNmaWxlTmFtZXNcbiAgICovXG4gIGlucHV0RmlsZXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcblxuICAvKipcbiAgICogQSBoZWxwZXIgdGhlIHRyYW5zZm9ybWVyIGNhbiB1c2Ugd2hlbiBnZW5lcmF0aW5nIG5ldyBpbXBvcnQgc3RhdGVtZW50c1xuICAgKiBAcGFyYW0gZmlsZU5hbWUgdGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGZpbGUgYXMgcmVmZXJlbmNlZCBpbiB0aGUgdHMuUHJvZ3JhbVxuICAgKiBAcmV0dXJuIGEgc3RyaW5nIHN1aXRhYmxlIGZvciB1c2UgaW4gYW4gaW1wb3J0IHN0YXRlbWVudFxuICAgKi9cbiAgZmlsZU5hbWVUb01vZHVsZUlkOiAoZmlsZU5hbWU6IHN0cmluZykgPT4gc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoaXMgQVBJIGlzIHNpbXBsZXIgdGhhbiBMYW5ndWFnZVNlcnZpY2UgcGx1Z2lucy5cbiAqIEl0J3MgdXNlZCBmb3IgcGx1Z2lucyB0aGF0IG9ubHkgdGFyZ2V0IHRoZSBjb21tYW5kLWxpbmUgYW5kIG5ldmVyIHJ1biBpbiBhblxuICogZWRpdG9yIGNvbnRleHQuXG4gKlxuICogT25lIGluc3RhbmNlIG9mIHRoZSBUc2NQbHVnaW4gd2lsbCBiZSBjcmVhdGVkIGZvciBlYWNoIGV4ZWN1dGlvbiBvZiB0aGUgY29tcGlsZXIsIHNvIGl0IGlzXG4gKiBzYWZlIGZvciB0aGVzZSBwbHVnaW5zIHRvIGhvbGQgc3RhdGUgdGhhdCdzIGxvY2FsIHRvIG9uZSBleGVjdXRpb24uXG4gKlxuICogVGhlIG1ldGhvZHMgb24gdGhlIHBsdWdpbiB3aWxsIGJlIGNhbGxlZCBpbiB0aGUgb3JkZXIgc2hvd24gYmVsb3c6XG4gKiAtIHdyYXBIb3N0IHRvIGludGVyY2VwdCBDb21waWxlckhvc3QgbWV0aG9kcyBhbmQgY29udHJpYnV0ZSBpbnB1dEZpbGVzIHRvIHRoZSBwcm9ncmFtXG4gKiAtIHdyYXAgdG8gaW50ZXJjZXB0IGRpYWdub3N0aWNzIHJlcXVlc3RzIG9uIHRoZSBwcm9ncmFtXG4gKiAtIGNyZWF0ZVRyYW5zZm9ybWVycyBvbmNlIGl0J3MgdGltZSB0byBlbWl0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHNjUGx1Z2luIHtcbiAgLyoqXG4gICAqIEFsbG93IHBsdWdpbnMgdG8gYWRkIGFkZGl0aW9uYWwgZmlsZXMgdG8gdGhlIHByb2dyYW0uXG4gICAqIEZvciBleGFtcGxlLCBBbmd1bGFyIGNyZWF0ZXMgbmdzdW1tYXJ5IGFuZCBuZ2ZhY3RvcnkgZmlsZXMuXG4gICAqIFRoZXNlIGZpbGVzIG11c3QgYmUgaW4gdGhlIHByb2dyYW0gc2luY2UgdGhlcmUgbWF5IGJlIGluY29taW5nIHJlZmVyZW5jZXMgdG8gdGhlIHN5bWJvbHMuXG4gICAqIEBwYXJhbSBpbnB1dEZpbGVzIHRoZSBmaWxlcyB0aGF0IHdlcmUgcGFydCBvZiB0aGUgb3JpZ2luYWwgcHJvZ3JhbVxuICAgKiBAcGFyYW0gY29tcGlsZXJIb3N0OiB0aGUgb3JpZ2luYWwgaG9zdCAobGlrZWx5IGEgdHMuQ29tcGlsZXJIb3N0KSB0aGF0IHdlIGNhbiBkZWxlZ2F0ZSB0b1xuICAgKi9cbiAgd3JhcEhvc3Q/KGlucHV0RmlsZXM6IHN0cmluZ1tdLCBjb21waWxlckhvc3Q6IFBsdWdpbkNvbXBpbGVySG9zdCk6IFBsdWdpbkNvbXBpbGVySG9zdDtcblxuICAvKipcbiAgICogU2FtZSBBUEkgYXMgdHMuTGFuZ3VhZ2VTZXJ2aWNlOiBhbGxvdyB0aGUgcGx1Z2luIHRvIGNvbnRyaWJ1dGUgYWRkaXRpb25hbFxuICAgKiBkaWFnbm9zdGljc1xuICAgKiBJTVBPUlRBTlQ6IHBsdWdpbnMgbXVzdCBwcm9wYWdhdGUgdGhlIGRpYWdub3N0aWNzIGZyb20gdGhlIG9yaWdpbmFsIHByb2dyYW0uXG4gICAqIEV4ZWN1dGlvbiBvZiBwbHVnaW5zIGlzIG5vdCBhZGRpdGl2ZTsgb25seSB0aGUgcmVzdWx0IGZyb20gdGhlIHRvcC1tb3N0XG4gICAqIHdyYXBwZWQgUHJvZ3JhbSBpcyB1c2VkLlxuICAgKi9cbiAgd3JhcChwOiB0cy5Qcm9ncmFtLCBjb25maWc/OiB7fSwgaG9zdD86IHRzLkNvbXBpbGVySG9zdCk6IHRzLlByb2dyYW07XG5cbiAgLyoqXG4gICAqIEFsbG93IHBsdWdpbnMgdG8gY29udHJpYnV0ZSBhZGRpdGlvbmFsIFR5cGVTY3JpcHQgQ3VzdG9tVHJhbnNmb3JtZXJzLlxuICAgKiBUaGVzZSBjYW4gbW9kaWZ5IHRoZSBUUyBBU1QsIEpTIEFTVCwgb3IgLmQudHMgb3V0cHV0IEFTVC5cbiAgICovXG4gIGNyZWF0ZVRyYW5zZm9ybWVycz8oaG9zdDogUGx1Z2luQ29tcGlsZXJIb3N0KTogdHMuQ3VzdG9tVHJhbnNmb3JtZXJzO1xufVxuXG4vLyBUT0RPKGFsZXhlYWdsZSk6IHRoaXMgc2hvdWxkIGJlIHVuaW9uZWQgd2l0aCB0c3NlcnZlcmxpYnJhcnkuUGx1Z2luTW9kdWxlXG5leHBvcnQgdHlwZSBQbHVnaW4gPSBUc2NQbHVnaW47XG5cbi8qKlxuICogVGhlIHByb3h5IGRlc2lnbiBwYXR0ZXJuLCBhbGxvd2luZyB1cyB0byBjdXN0b21pemUgYmVoYXZpb3Igb2YgdGhlIGRlbGVnYXRlXG4gKiBvYmplY3QuXG4gKiBUaGlzIGNyZWF0ZXMgYSBwcm9wZXJ0eS1ieS1wcm9wZXJ0eSBjb3B5IG9mIHRoZSBvYmplY3QsIHNvIGl0IGNhbiBiZSBtdXRhdGVkXG4gKiB3aXRob3V0IGFmZmVjdGluZyBvdGhlciB1c2VycyBvZiB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Byb3h5X3BhdHRlcm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5PFQ+KGRlbGVnYXRlOiBUKTogVCB7XG4gIGNvbnN0IHByb3h5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKGRlbGVnYXRlKSkge1xuICAgIHByb3h5W2tdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGRlbGVnYXRlIGFzIGFueSlba10uYXBwbHkoZGVsZWdhdGUsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gcHJveHk7XG59XG4iXX0=