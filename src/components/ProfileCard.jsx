import React from "react";
import DiningRoom from "../assets/interior-photos/dining-room.png";
import KidsRoom from "../assets/interior-photos/kids-room.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";

function ProfileCard({
    userImg = KidsRoom,
    bgImg = DiningRoom,
    name = "Divyansh",
    role = "Homeowner",
    desc = `"Urban Grih is an amazing home map design and interior company. They designed my home map, and the whole experience was super smooth and affordable. The management was always on top of things, but what I loved the most was their communication they were available whenever I needed them and made changes exactly as I requested, without any hassle.

A special thanks to Mr. Ujjwal kulshrestha for the wonderful home map design. I had asked for a home map within 1100 sq. ft. including a garden, which honestly felt impossible  getting both a luxurious home and a garden in that space. But his skills made it completely possible.

Really happy with the final result and would definitely recommend Urban Grih to anyone looking for smart, well-planned home designs."`,
}) {
    return (
        <Dialog.Root className="profile-card-wrapper">
            <Dialog.Trigger className="profile-card-trigger">
                <div className="profile-card">
                    <div className="profile-card-image">
                        <img src={bgImg} alt="" />
                    </div>
                    <div className="profile-card-data">
                        <div className="profile-card-profile">
                            <img src={userImg} alt="" />
                        </div>
                        <div className="profile-card-detail">
                            <h3>{name}</h3>
                            <p>{role}</p>
                        </div>
                        <div className="profile-card-desc">
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="profile-card-popover-overlay" />
                <Dialog.Content className="profile-card-popover-wrapper">
                    <div className="profile-card-popover">
                        <div className="profile-card-popover-image">
                            <img src={bgImg} alt="" />
                        </div>
                        <div className="profile-card-popover-data">
                            <div className="profile-card-popover-profile">
                                <img src={userImg} alt="" />
                            </div>
                            <div className="profile-card-popover-detail">
                                <h3>{name}</h3>
                                <p>{role}</p>
                            </div>
                            <div className="profile-card-popover-desc">
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default ProfileCard;
