import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const people = [
  {
    name: 'Dmitri Mendeleev',
    born: 1834, died: 1907, nationality: 'Russian',
    biography: 'A Russian chemist and inventor who formalized the periodic table in 1869, organizing all known elements by atomic weight and predicting the properties of elements not yet discovered.',
    contribution: 'Created the periodic table. Left deliberate gaps for undiscovered elements and predicted their properties so accurately that when those elements were found, they matched his descriptions almost exactly.',
    gameAngle: 'The ultimate prophet card — he saw the board before the game was played.',
    funFact: 'Mendeleev reportedly saw the complete arrangement of the periodic table in a dream and woke up to write it down. He was also passed over for the Nobel Prize due to a personal feud within the Swedish Academy.',
    relatedElements: 'Md (101, named after him)',
  },
  {
    name: 'Marie Curie',
    born: 1867, died: 1934, nationality: 'Polish-French',
    biography: 'A physicist and chemist who conducted pioneering research on radioactivity. The first woman to win a Nobel Prize, and the only person ever to win Nobel Prizes in two different sciences.',
    contribution: 'Discovered polonium and radium, coined the term "radioactivity," and developed techniques for isolating radioactive isotopes. Her work opened the entire field of nuclear physics.',
    gameAngle: 'A legendary dual-class card — equally at home in Nucleus and Bloom (her work touched both destruction and healing).',
    funFact: 'Her personal notebooks from the 1890s are still so radioactive that they are stored in lead-lined boxes in Paris. Researchers who want to view them must sign a waiver and wear protective gear.',
    relatedElements: 'Po (84), Ra (88)',
  },
  {
    name: 'Pierre Curie',
    born: 1859, died: 1906, nationality: 'French',
    biography: 'A French physicist and Marie Curie\'s husband and research partner. Together they discovered polonium and radium, sharing the 1903 Nobel Prize in Physics with Henri Becquerel.',
    contribution: 'Co-discovered radioactivity and the elements polonium and radium. Also discovered the piezoelectric effect and the relationship between magnetism and temperature (the Curie point).',
    gameAngle: 'A support card whose value multiplies when paired with Marie Curie — stronger together than apart.',
    funFact: 'Pierre died at 46 when he slipped in the rain and fell under a horse-drawn wagon, fracturing his skull. Had he lived, the arc of 20th century physics might have been very different.',
    relatedElements: 'Po (84), Ra (88)',
  },
  {
    name: 'Antoine Lavoisier',
    born: 1743, died: 1794, nationality: 'French',
    biography: 'The father of modern chemistry. Lavoisier established that combustion requires oxygen, named oxygen and hydrogen, and authored the first modern chemistry textbook with a systematic naming of compounds.',
    contribution: 'Named oxygen, hydrogen, and many other elements. Proved that matter is conserved in chemical reactions (the law of conservation of mass). Transformed chemistry from a set of observations into a rigorous science.',
    gameAngle: 'The lawmaker card — establishes rules that persist on the board even after he leaves play.',
    funFact: 'Despite his enormous contributions to science, Lavoisier was guillotined during the French Revolution at age 50. When he appealed for more time to complete his work, the judge reportedly said "The Republic has no need of scientists."',
    relatedElements: 'O (8), H (1)',
  },
  {
    name: 'Ernest Rutherford',
    born: 1871, died: 1937, nationality: 'New Zealand-British',
    biography: 'A New Zealand-born British physicist known as the father of nuclear physics. His gold foil experiment in 1909 proved that atoms have a dense, positively charged nucleus surrounded by mostly empty space.',
    contribution: 'Discovered the atomic nucleus, the proton, and pioneered the concept of radioactive half-life. Distinguished alpha, beta, and gamma radiation and performed the first artificial nuclear reaction.',
    gameAngle: 'The architect of the modern atom — a card that restructures how other cards interact with the board.',
    funFact: 'Rutherford won the Nobel Prize in Chemistry in 1908, but he considered himself a physicist and reportedly joked that the fastest transformation he knew of was being turned into a chemist upon winning it.',
    relatedElements: 'Rf (104, named after him)',
  },
  {
    name: 'Niels Bohr',
    born: 1885, died: 1962, nationality: 'Danish',
    biography: 'A Danish physicist who developed the first quantum model of the atom in 1913, proposing that electrons orbit the nucleus in fixed shells. A central figure in early quantum mechanics and the Manhattan Project.',
    contribution: 'Created the Bohr model of the atom (electrons in energy shells), which remains the most common way atoms are taught and visualized. Helped explain atomic emission spectra and laid the groundwork for quantum mechanics.',
    gameAngle: 'The shell system — a card that defines the structure other cards operate within.',
    funFact: 'During WWII, Bohr was smuggled out of Nazi-occupied Denmark hidden in the bomb bay of a British Mosquito aircraft. He nearly died when his oxygen mask did not fit properly and he passed out at altitude.',
    relatedElements: 'Bh (107, named after him)',
  },
  {
    name: 'Lise Meitner',
    born: 1878, died: 1968, nationality: 'Austrian-Swedish',
    biography: 'An Austrian-Swedish physicist who co-discovered nuclear fission with Otto Hahn in 1938. One of the greatest scientific injustices of the 20th century: Hahn received the Nobel Prize for the discovery; Meitner was left out entirely.',
    contribution: 'Co-discovered nuclear fission and provided the theoretical explanation for how a uranium nucleus splits into lighter elements, releasing enormous energy. Her work was essential to understanding atomic bombs and nuclear reactors.',
    gameAngle: 'The uncredited power — enormous ability, undervalued cost. A card that quietly enables massive plays.',
    funFact: 'Meitner was nominated for the Nobel Prize 48 times across her career and never received it. Albert Einstein called her "the German Marie Curie." Element 109, meitnerium, was named in her honor.',
    relatedElements: 'Mt (109, named after her)',
  },
  {
    name: 'Henry Moseley',
    born: 1887, died: 1915, nationality: 'British',
    biography: 'A British physicist who at age 26 reorganized the periodic table by atomic number (proton count) instead of atomic mass, resolving several inconsistencies in Mendeleev\'s original arrangement.',
    contribution: 'Discovered that each element has a unique atomic number defined by its proton count, which is the true organizing principle of the periodic table. Also predicted the existence of four missing elements.',
    gameAngle: 'The one who fixed the rules — a card that corrects and stabilizes the entire board state.',
    funFact: 'Moseley was killed in action at Gallipoli in WWI at age 27. His loss was considered so catastrophic to science that the British government subsequently prohibited scientists from serving in combat roles. Many physicists believe he would have won multiple Nobel Prizes.',
    relatedElements: 'All elements — he defined what atomic number means',
  },
  {
    name: 'Glenn T. Seaborg',
    born: 1912, died: 1999, nationality: 'American',
    biography: 'An American chemist who co-discovered or co-created 10 chemical elements — more than any other scientist in history. He was also involved in the Manhattan Project and served as chairman of the US Atomic Energy Commission.',
    contribution: 'Co-discovered plutonium, americium, curium, berkelium, californium, einsteinium, fermium, mendelevium, nobelium, and seaborgium. Proposed the actinide concept, which restructured the lower portion of the periodic table.',
    gameAngle: 'The most element-connected human to ever live — a card that unlocks or buffs an entire row of the table.',
    funFact: 'Seaborg is one of only two people to have an element named after them while still alive (seaborgium, 1997). He reportedly heard about it on a radio call-in show before being officially notified.',
    relatedElements: 'Pu (94), Am (95), Cm (96), Bk (97), Cf (98), Es (99), Fm (100), Md (101), No (102), Sg (106)',
  },
  {
    name: 'Humphry Davy',
    born: 1778, died: 1829, nationality: 'British',
    biography: 'A British chemist and inventor who isolated more elements than any scientist of his era using the then-new technology of electrolysis. Also invented the Davy safety lamp for miners.',
    contribution: 'Isolated sodium, potassium, calcium, magnesium, barium, boron, and strontium for the first time. Discovered that chlorine is an element (not a compound) and identified iodine as an element.',
    gameAngle: 'The isolator — a card that extracts and separates, pulling single cards from groups or combinations.',
    funFact: 'Davy reportedly said that his greatest discovery was Michael Faraday, his laboratory assistant who went on to discover electromagnetic induction and became one of the most influential scientists in history.',
    relatedElements: 'Na (11), K (19), Ca (20), Mg (12), Ba (56), B (5), Sr (38)',
  },
  {
    name: 'Carl Wilhelm Scheele',
    born: 1742, died: 1786, nationality: 'Swedish',
    biography: 'A Swedish pharmaceutical chemist who discovered more elements than any scientist of the 18th century, yet received credit for almost none of them because he published slowly while others raced ahead.',
    contribution: 'Discovered or first isolated oxygen (before Priestley got credit), chlorine, manganese, barium, molybdenum, tungsten, and several others. Also discovered many organic acids still used today.',
    gameAngle: 'The underdog — a high-value card that consistently gets countered before its effect resolves, but eventually changes the game.',
    funFact: 'Scheele had a dangerous habit of smelling and tasting his chemical discoveries to identify them — including mercury, arsenic, and hydrocyanic acid compounds. He died at 43, likely from cumulative heavy metal poisoning from his own experiments.',
    relatedElements: 'O (8), Cl (17), Mn (25), Ba (56), Mo (42), W (74)',
  },
  {
    name: 'Robert Bunsen',
    born: 1811, died: 1899, nationality: 'German',
    biography: 'A German chemist who pioneered spectroscopy as a tool for identifying elements and discovered two new elements using it. Also invented the Bunsen burner and contributed to photochemistry.',
    contribution: 'Developed spectroscopy to identify elements by the unique colors they emit when heated. Used it to discover cesium (1860) and rubidium (1861) — the first elements discovered using light rather than chemical methods.',
    gameAngle: 'The revealer — a card that identifies hidden information, exposing opponent hands or unrevealed card properties.',
    funFact: "Bunsen lost sight in one eye in a cacodyl cyanide explosion early in his career and nearly died. He never married, reportedly saying he didn't have time. He is more famous for an invention (the Bunsen burner) that he didn't actually invent — an earlier version existed, and he just improved it.",
    relatedElements: 'Cs (55), Rb (37)',
  },
  {
    name: 'Yuri Oganessian',
    born: 1933, died: null, nationality: 'Russian',
    biography: 'A Russian nuclear physicist and the world\'s leading expert on superheavy elements. Has led or contributed to the discovery of elements 104 through 118 at the Joint Institute for Nuclear Research in Dubna, Russia.',
    contribution: 'Pioneered the use of calcium-48 beams to synthesize superheavy elements, enabling the discovery of elements 113–118. His work extended the periodic table to its current endpoint.',
    gameAngle: 'The table-ender — the person who filled in the last row. A card associated with completion, limits, and what comes next.',
    funFact: 'Oganessian is one of only two people to have an element named after them while still alive (oganesson, element 118, named in 2016). At over 90, he continues to work at JINR in Dubna.',
    relatedElements: 'Og (118, named after him), Fl (114), Mc (115), Lv (116), Ts (117)',
  },
  {
    name: 'Enrico Fermi',
    born: 1901, died: 1954, nationality: 'Italian-American',
    biography: 'An Italian-American physicist who built the world\'s first nuclear reactor in 1942 under a squash court at the University of Chicago. A central architect of the Manhattan Project and a pioneer of quantum mechanics.',
    contribution: 'Created the first self-sustaining nuclear chain reaction, proving that nuclear fission could be controlled and used as an energy source. Also developed Fermi-Dirac statistics and contributed foundational work in particle physics.',
    gameAngle: 'The reactor — a card that, once played, generates ongoing power that compounds each turn until stopped.',
    funFact: 'Fermi built Chicago Pile-1, the first nuclear reactor, in a converted squash court under the stands of Stagg Field stadium. The project was so secret that the city of Chicago had no idea a nuclear reactor was running beneath its streets. The coded message sent when it succeeded was: "The Italian navigator has just landed in the new world."',
    relatedElements: 'Fm (100, named after him)',
  },
  {
    name: 'Alfred Nobel',
    born: 1833, died: 1896, nationality: 'Swedish',
    biography: 'A Swedish chemist, engineer, and inventor who held 355 patents and made his fortune primarily from the invention of dynamite. Upon reading a premature obituary calling him "the merchant of death," he rewrote his will to establish the Nobel Prizes.',
    contribution: 'Invented dynamite (stabilized nitroglycerin), gelignite, and ballistic explosive. Though not a discoverer of elements, his legacy funds the prizes that have recognized nearly every major advancement in chemistry and physics for over 120 years.',
    gameAngle: 'Regret as power — a card that becomes stronger the more destruction has occurred on the board, turning damage dealt into something constructive.',
    funFact: "Nobel never married. He described himself in one letter as 'a solitary creature.' He wrote the Nobel Prize into his will in secret, and his family was furious when it was revealed — they felt the fortune should go to them, not to the world.",
    relatedElements: 'No (102, named after him)',
  },
]

async function main() {
  console.log(`Seeding ${people.length} people...`)
  for (const person of people) {
    await prisma.person.upsert({
      where: { id: people.indexOf(person) + 1 },
      update: {},
      create: person,
    })
  }
  console.log('Done.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
