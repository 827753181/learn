import { get } from "lodash";
import React, { ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface IRouterType {
	name?: string;
	path: string;
	children?: Array<IRouterType>;
	component: any;
}

function createLazyLoadingComponent(lazyComp) {
	const Component = React.lazy(lazyComp);
	return (
		<React.Suspense
			fallback={
				<div
					style={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Loading...
				</div>
			}
		>
			<Component />
		</React.Suspense>
	);
}

const modules = import.meta.glob("@/pages/**/*.tsx");
console.log(modules);

let routes: Array<IRouterType> = [];
for (let key in modules) {
	const path = get(key.match(/\.\.\/pages(\S+)\.tsx/), "[1]", "").split(
		"/index"
	)[0];
	path &&
		routes.push({
			path,
			component: createLazyLoadingComponent(modules[key]),
		});
}

export default function () {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(({ path, component }) => (
					<Route key={path} path={path} element={component} />
				))}
			</Routes>
		</BrowserRouter>
	);
}
