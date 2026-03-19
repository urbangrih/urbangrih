import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Menu_options from "../pages/Menu_options.jsx";
import Experts_options from "../pages/experts/Experts_options.jsx";
import Design from "../pages/Design.jsx";
import Experts from "../pages/Experts.jsx";
import Materials from "../pages/Materials.jsx";

function SectionRouter() {
    const { section } = useParams();
    const [params] = useSearchParams();
    const views = {
        design: Design,
        //IMP: Disabled experts and materials sections for now, as they are not ready. Can be enabled later by uncommenting these lines and adding the corresponding components.
        // experts: Experts,
        // materials: Materials,
    };

    if (params.size === 0) {
        const View = views[section];
        return View ? <View /> : null;
    }
    //IMP: Render Experts_options for experts section disabled for now
    // if (section === "experts") {
    //     return <Experts_options />;
    // }

    // Render Menu_options for design and materials sections
    return <Menu_options />;
}

export default SectionRouter;
