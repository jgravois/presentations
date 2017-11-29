<!-- outline

https://gist.github.com/jgravois/2099fbcaf9fbca0f0ae2b45e9cdd544d

-->

# *ArcGIS* Hub


John ([@geogangster](@https://twitter.com/geogangster)) <br>Patrick ([@hamhandedly](https://twitter.com/hamhandedly))


Slides: [`http://bit.ly/2mCMd5o`](http://bit.ly/2mCMd5o)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

## How is this going to work?

1. ~~`code`~~
2. A *brief* introduction
3. **In situ** demo

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## what _is_ GitHub?

(hint: it ends with [`.com`](https://github.com))

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

* file hosting
* change archiving
* communication tool

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## what _is_ Git?

**distributed** version control

<p class="fragment">similar to replicated SDE versioning</p>

<!-- need screenshot -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## lets get collaborating!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat finds a cool [open source](https://github.com/jgravois/sandbox) project

https://github.com/jgravois/sandbox

* [GitHub: Fork A Repo](https://help.github.com/articles/fork-a-repo/)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat creates his own [**fork**](https://github.com/patrickarlt/sandbox) of the project
another repo _hosted on github.com_

<p class="fragment">git is distributed, each repo is a node in the graph<p>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat **clones** the repository
copys it _onto his computer_

```bash
git clone https://github.com/patrickarlt/sandbox.git
```

<p class="fragment">this creates another repo on pat's computer, another node in the graph<p>


---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat creates a **branch**
to store his own work

```bash
git checkout -b updates
```

* [Branches in a Nutshell](https://git-scm.com/book/id/v2/Git-Branching-Branches-in-a-Nutshell)
* [Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
* [Atlassian: Using Branches](https://www.atlassian.com/git/tutorials/using-branches)
* [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat **commits** in the new branch
to save his edits

```
git commit -am "update friends.geojson"
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat **pushes** the branch up to his fork

```bash
git push origin master
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## then pat creates a **pull request**
to propose that john incorporate his work too

* [Creating a pull request](https://help.github.com/articles/creating-a-pull-request/)
* [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## john **merges** the pull request!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## john makes his own commit directly in GitHub

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## pat creates another **branch**
to store more edits

```bash
git checkout -b more-updates
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## and opens another pull request

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## [**merge conflict!**](https://github.com/jgravois/sandbox/pulls)
john edited the _same line_ of the same file

* [Resolve merge conflict w/ command line](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/)
* [Resolve merge conflict on GitHub](https://help.github.com/articles/resolving-a-merge-conflict-on-github/)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## so pat **pulls** from upstream
and resolves the conflict manually

```bash
git pull upsteam master
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## john has a suggestion for pat

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## so john **tracks** pat's fork

```bash
git remote add pat https://github.com/patrickarlt/sandbox.git
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## and **fetches** information about it

```bash
git fetch pat
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## and john checks out a new branch based on pat's fork

```bash
git checkout -b suggest-a-change pat/more-updates
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## and opens a pull request of his own

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

lets [whiteboard](https://twitter.com/cthydng/status/575483540202106880) it

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## teamwork makes the _dream work_!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## resources

* [Try Git! (Browser based)](https://git-scm.com/)
* [GitHub Flow](https://guides.github.com/introduction/flow/)
* [Atlassian: Learning Git](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
* [GitHub Guides](https://guides.github.com)
* [Git Documentation](https://git-scm.com/)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

please, _please_, **please** fill out a session survey

1. download the Esri Events App
2. select Dev Summit
3. search for "Git/GitHub for Geographers"
4. leave feedback!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

idea, question, issue, or success story?

[@geogangster](https://twitter.com/geogangster) / [@patrickarlt](https://twitter.com/patrickarlt)

Slides: [`http://bit.ly/2mCMd5o`](http://bit.ly/2mCMd5o)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-end.png" -->
