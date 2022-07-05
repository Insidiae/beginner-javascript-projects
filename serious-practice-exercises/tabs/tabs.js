const tabs = document.querySelector(".tabs");
const allTabButtons = tabs.querySelectorAll(`[role="tab"]`);
const allTabPanels = Array.from(tabs.querySelectorAll(`[role="tabpanel"]`));

function handleTabClick(event) {
  // hide all tab panels
  allTabPanels.forEach((tabPanel) => {
    tabPanel.hidden = true;
  });
  // mark all tabs as unselected
  allTabButtons.forEach((tabButton) => {
    tabButton.setAttribute("aria-selected", false);
  });
  // mark the clicked tab as selected
  event.currentTarget.setAttribute("aria-selected", true);
  // find the associated tabpanel and show it!
  const { id } = event.currentTarget;
  // const selectedTabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  //? or: use `Array.find()`
  const selectedTabPanel = allTabPanels.find((tabPanel) => tabPanel.getAttribute("aria-labelledby") === id);
  selectedTabPanel.hidden = false;
}

allTabButtons.forEach((tabButton) => {
  tabButton.addEventListener("click", handleTabClick);
});
